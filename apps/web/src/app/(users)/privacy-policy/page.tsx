import Image from 'next/image'
import { Heading } from '../../components/heading'
import { Text } from '../../components/text'
import { Button } from '../../components/button'
import { Link } from '../../components/link'
import styles from '../page.module.css'

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-white">
      <div className="w-full max-w-2xl flex flex-col items-center">
        <Image src="/images/logo.png" alt="Stansbury Swim" width={180} height={60} className="mb-6" />
        <Heading level={1} className="mb-2 text-center">
          Stansbury Swim Privacy Policy
        </Heading>
        <Text className="mb-1 text-center text-sm text-zinc-400">Last modified on April 07, 2014</Text>
        <div className="mt-6 space-y-6 text-left">
          <Text>
            Stansbury Swim ("us", "we", or "our") operates{' '}
            <Link href="https://www.stansburyswim.com">stansburyswim.com</Link> (the "Site"). This page informs you of
            our policies regarding the collection, use and disclosure of Personal Information we receive from users of
            the Site.
          </Text>
          <Text>
            We use your Personal Information only for providing and improving the Site. By using the Site, you agree to
            the collection and use of information in accordance with this policy. Unless otherwise defined in this
            Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions,
            accessible at <Link href="https://www.stansburyswim.com">stansburyswim.com</Link>.
          </Text>
          <Heading level={2} className="mt-8 mb-2">
            Information Collection And Use
          </Heading>
          <Text>
            While using our Site, we may ask you to provide us with certain personally identifiable information that can
            be used to contact or identify you. Personally identifiable information may include, but is not limited to,
            your name, email address, postal address and phone number ("Personal Information").
          </Text>
          <Heading level={2} className="mt-8 mb-2">
            Log Data
          </Heading>
          <Text>
            Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log
            Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address,
            browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the
            time spent on those pages and other statistics.
          </Text>
          <Heading level={2} className="mt-8 mb-2">
            Cookies
          </Heading>
          <Text>
            Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are
            sent to your browser from a web site and stored on your computer's hard drive. Like many sites, we use
            "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a
            cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our
            Site.
          </Text>
          <Heading level={2} className="mt-8 mb-2">
            Security
          </Heading>
          <Text>
            The security of your Personal Information is important to us, but remember that no method of transmission
            over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially
            acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
          </Text>
          <Heading level={2} className="mt-8 mb-2">
            Links To Other Sites
          </Heading>
          <Text>
            Our Site may contain links to other sites that are not operated by us. If you click on a third party link,
            you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of
            every site you visit. Stansbury Swim has no control over, and assumes no responsibility for, the content,
            privacy policies, or practices of any third party sites or services.
          </Text>
          <Heading level={2} className="mt-8 mb-2">
            Changes To This Privacy Policy
          </Heading>
          <Text>
            Stansbury Swim may update this Privacy Policy from time to time. We will notify you of any changes by
            posting the new Privacy Policy on the Site. You are advised to review this Privacy Policy periodically for
            any changes.
          </Text>
          <Heading level={2} className="mt-8 mb-2">
            Contact Us
          </Heading>
          <Text>If you have any questions about this Privacy Policy, please contact us. info@stansburyswim.com</Text>
        </div>
        <Button href="/" color="blue" className="mt-10 w-40">
          Home
        </Button>
      </div>
    </div>
  )
}
