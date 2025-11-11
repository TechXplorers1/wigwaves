import Breadcrumb from "@/components/layout/breadcrumb";

export default function HairCareTipsPage() {
  return (
    <div className="container py-12 md:py-24">
      <Breadcrumb />
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-headline tracking-tight">Hair Care Tips</h1>
        <p className="mt-4 max-w-4xl mx-auto text-lg text-muted-foreground">
          It is very important to keep the quality of your wig in the best condition that you can. With proper care and maintenance, your wig is guaranteed to to last 2-3 years. Please read all of the information below:
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 text-left">
        <div>
          <h2 className="text-2xl font-bold font-headline mb-4">Washing:</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-lg">
            <li>Before washing your wig, always use a wide-tooth comb to get rid of tangles. Start from the ends of the hair until you work your way up to the top.</li>
            <li>After washing your wig, avoid adding any heat with a blow dryer. Allow your wig to sit overnight and air dry.</li>
            <li>Avoid excess build up with glue or gel by using alcohol for removal. Wash your wig every 2-4 weeks to remove any build up or products.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold font-headline mb-4">Storing Your Wig:</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-lg">
            <li>When removing your wig, avoid laying/throwing your wigs around. Store them properly with a wig head. Satin Bags are included in every order. This is also a great way to store your wigs and extensions.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold font-headline mb-4">Products:</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-lg">
            <li>The constant use of flat irons and blow dryers can damage and reduce the longevity of your wig. It is recommended that you use heat protectant spray before styling your hair.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
