import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  NotFoundException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common'
import { PaymentService } from './payment.service'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { UpdatePaymentDto } from './dto/update-payment.dto'
import { PaypalService } from './paypal.service'
import { ActiveUser } from 'iam/authentication/decorators/active-user.decorator'
import { ActiveUserData } from 'iam/authentication/interfaces/active-user-data.interface'
import { UserService } from 'user/user.service'
import { CreatePaypalOrderDto } from './dto/create-paypal-order.dto'
import { PaymentGatewayTypesEnum } from 'shared/payment-gateway-types.enum'
import { PaymentStatusTypesEnum } from 'shared/payment-status-types.enum'
import { Roles } from 'iam/authentication/decorators/roles.decorator'
import { Role } from '@lesson-scheduler/shared'

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly paypalService: PaypalService,
    private readonly userService: UserService,
  ) {}

  @Get('')
  async findAll() {
    const products = await this.paymentService.findAll()
    return products
  }

  @Post('paypal-create-order')
  async createPaypalOrder(@Body() createPaypalOrder: CreatePaypalOrderDto, @ActiveUser() userdata: ActiveUserData) {
    const user = await this.userService.findOne(userdata.sub)
    const order = await this.paypalService.createOrder(createPaypalOrder.productId, createPaypalOrder.quantity, user)
    await this.paymentService.create({
      productId: createPaypalOrder.productId,
      quantity: createPaypalOrder.quantity,
      userId: userdata.sub,
      paymentGateway: PaymentGatewayTypesEnum.PAYPAL,
      paymentGatewayId: order.id,
      status: PaymentStatusTypesEnum.PENDING,
      scheduleId: createPaypalOrder.scheduleId,
      studentId: createPaypalOrder.studentId,
    })
    return {
      id: order.id,
    }
  }

  @Post('paypal-capture-order')
  @HttpCode(204)
  async captureOrder(@Body() { orderId }, @ActiveUser() userdata: ActiveUserData) {
    const order = await this.paypalService.captureOrder(orderId)

    const payment = await this.paymentService.findByGatewayId(order.id)
    if (!payment) {
      throw new NotFoundException()
    }

    if (payment.userId !== userdata.sub) {
      throw new NotFoundException()
    }

    if (order.status === 'COMPLETED') {
      await this.paymentService.update({
        id: payment.id,
        paymentGatewayId: order.id,
        status: PaymentStatusTypesEnum.SUCCESS,
      })
    }

    return order
  }

  @Post('apple-validate-merchant')
  async appleValidateMerchant(@Body('validationUrl') validationUrl: string) {
    const merchantIdentifier = 'your-merchant-identifier' // Your Apple Pay Merchant ID
    const displayName = 'Stansbury Swim'
    const domainName = 'your-domain.com'

    const response = await fetch(validationUrl, {
      method: 'POST',
      body: JSON.stringify({
        merchantIdentifier,
        displayName,
        domainName,
      }),
      headers: { 'Content-Type': 'application/json' },
      // agent: add custom agent to use cert and key once we have them
    })

    console.log(response)

    return response.json()
  }

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.paymentService.findOne(id)
    if (!product) {
      throw new NotFoundException()
    }
    return product
  }

  // TODO don't allow users to manually update payment status
  @Patch(':id')
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentService.findOne(id)
    if (!payment) {
      throw new NotFoundException()
    }
    return this.paymentService.update({
      ...updatePaymentDto,
      id,
    })
  }
}
