import React from 'react'
import GooglePayButton from '@google-pay/button-react'

const GooglePay = () => {
  return (
    <div className='btn-google'>
      <GooglePayButton className='google-pay'

        environment='TEST'
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['VISA', 'MASTERCARD'],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example',
                  gatewayMerchantId: 'exampleGatewayMerchantId'
                }
              }
            }
          ],
          merchantInfo: {
            merchantId: '12345678901234567890',
            merchantName: 'DEMO Merchant'
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: '100.00',
            currencyCode: 'USD',
            countryCode: 'US'
          }
        }}
        onLoadPaymentData={paymentRequest => {
          console.log('Load Payment Data', paymentRequest)
        }}
      />
    </div>
  )
}

export default GooglePay