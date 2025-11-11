import Image from 'next/image';

export default function PoliciesPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-headline tracking-tight">Shipping & Return Policy</h1>
        </div>

        <div className="space-y-12 text-left">
          <div>
            <h2 className="text-2xl font-bold font-headline mb-4 text-foreground">Processing/Shipping Times:</h2>
            <ul className="list-disc pl-5 space-y-3 text-muted-foreground text-lg">
              <li>Please allow 14-21 business days (Monday-Friday) after processing for the completion of your wig. No Rush Orders on Custom Wigs. Ready to Ship Wigs will ship within 1-2 days. If you need your wig for a specific day, it is highly requested that you order ahead of time.</li>
              <li>Once your package has been shipped, you will receive a tracking number. Please allow 24 hours for your shipping activity to update. Orders over $300 will require a signature for delivery. Bria Janae is not responsible for any lost, stolen, or damaged packages.</li>
              <li>To ensure that your package is properly delivered and you receive shipment within the time frame we advertise, please make sure your address is fully entered and correct. Use correct abbreviations and have spaces inserted properly. If there is issues with verifying your address, we will contact you to try and resolve these issues. If after several attempts of contacting you, you do not respond, your order will be canceled and your money refunded to you.</li>
              <li>Expect shipping delays during sales and holidays.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-headline mb-4 text-foreground">Refund/Returns:</h2>
            <ul className="list-disc pl-5 space-y-3 text-muted-foreground text-lg">
              <li>Due to sanitary reasons, <strong>ALL WIG AND HAIR SALES ARE FINAL.</strong></li>
              <li>Exchanges and returns are not accepted. <strong>WIGS ARE NON-REFUNDABLE.</strong> If there is a mistake on our behalf, we will happily accept the hair back in it's original state in return for your correct order within 3 days of receiving. We have the right to decline items if they have been tampered with or sent back past the 3 day period.</li>
              <li><strong>Bria Janae is not responsible for any improperly fitted wigs.</strong> Before purchasing wigs, please be sure to properly measure your head. For the most accurate results, you will need to have a flat foundation. If the wrong head circumference is entered, you will be responsible for any reconstruction and shipping fees (if needed). Below is a guide that you can follow.</li>
              <li>All orders require a wig order verification form to be filled out within 24 hours of your purchase. This form will serve as a formal document between you the customer and Bria Janae Custom Wigs in order to complete and ship your custom wig. This file will be kept on record. If you would like a copy of this form it can be emailed to you if requested. Failure to complete the form will result in a refund and $25 restocking fee.</li>
              <li>Order cancellations/changes must be made within 48 hours of purchase. If you must cancel your order, there will be a $25 restocking fee.</li>
            </ul>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground">
             <p>Please ensure that you have read all descriptions and policies listed on this website before proceeding to checkout. If you have any questions, please feel free to reach out to us before completing your order.</p>
             <p>Thank you,<br />Bria Janae Custom Wigs</p>
          </div>

          <div className="mt-12">
            <Image 
                src="https://static.wixstatic.com/media/9f09d6_0963c023b5b04037bfd7637a112d4359~mv2.jpg/v1/fill/w_882,h_882,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/948AC026-6EF4-4C92-8181-1D2713493BB2.jpg"
                alt="Head measurement guide for wigs"
                width={800}
                height={800}
                className="mx-auto rounded-lg"
                data-ai-hint="head measurement guide"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
