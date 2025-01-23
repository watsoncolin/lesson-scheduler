import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { UpdatePaymentDto } from './dto/update-payment.dto'

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('')
  async findAll() {
    const products = await this.paymentService.findAll()
    return products
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
  async update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    const product = await this.paymentService.findOne(id)
    if (!product) {
      throw new NotFoundException()
    }
    return this.paymentService.update({
      ...updatePaymentDto,
      id,
    })
  }
}
