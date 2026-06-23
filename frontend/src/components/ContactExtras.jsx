import React from "react";
import { MapPin, PhoneCall } from "lucide-react";

const keyContacts = [
  { role: "Academic Coordinator", phone: "+91 95910 22163" },
  { role: "Program Lead", phone: "+91 9594260209" },
  { role: "Admin Lead", phone: "+91 90801 97843" },
  { role: "Relationship Coordinator", phone: "+91 90804 99916" },
  { role: "Alumni Coordinator", phone: "+91 94442 83430" },
];

const ContactExtras = () => {
  return (
    <section className="relative bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">Find Us & Key Contacts</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Reach out to the right person or visit us at our campus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* 📍 MAP */}
          <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-lg bg-white">
            <div className="p-6 border-b border-gray-200 flex items-center gap-3">
              <MapPin className="text-gray-900" />
              <h3 className="text-xl font-semibold text-gray-900">Our Location</h3>
            </div>
            <iframe
              title="Kumaraguru Campus Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.46216070981!2d76.98379807476975!3d11.078892253542376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f7001b198603%3A0x6c79441e2b0d84cf!2sREACT%20KCT!5e0!3m2!1sen!2sin!4v1770668379962!5m2!1sen!2sin"
              className="w-full h-[420px] border-none"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* ☎️ KEY CONTACTS */}
          <div className="rounded-3xl border border-gray-200 shadow-lg bg-white p-8">
            <div className="flex items-center gap-3 mb-8">
              <PhoneCall className="text-gray-900" />
              <h3 className="text-xl font-semibold text-gray-900">Key Contacts</h3>
            </div>

            <div className="space-y-6">
              {keyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div>
                    <p className="text-gray-900 font-medium">{contact.role}</p>
                    <p className="text-sm text-gray-500">Available during office hours</p>
                  </div>

                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="text-sm font-semibold text-gray-900 underline underline-offset-4 hover:text-black"
                  >
                    {contact.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactExtras;
