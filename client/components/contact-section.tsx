import { MapPin, Clock, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import InteractiveMap from "./interactive-map"

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Contact Us</h2>
          <p className="text-amber-700 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Reach out to us using the information below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="bg-amber-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-amber-900 mb-6">Visit Us</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-amber-700 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900">Address</h4>
                    <p className="text-amber-700">123 Coffee Street, Brewville, CA 94123</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-amber-700 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900">Hours</h4>
                    <p className="text-amber-700">Monday - Friday: 7am - 8pm</p>
                    <p className="text-amber-700">Saturday: 8am - 9pm</p>
                    <p className="text-amber-700">Sunday: 8am - 7pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-amber-700 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900">Phone</h4>
                    <p className="text-amber-700">(123) 456-7890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-amber-700 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900">Email</h4>
                    <p className="text-amber-700">hello@coffeehaven.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-amber-900 mb-4">Find Us</h3>
                <InteractiveMap />
              </div>
            </div>
          </div>

          <div>
            <div className="bg-amber-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-amber-900 mb-6">Send Us a Message</h3>

              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input id="contact-name" placeholder="Your name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" type="email" placeholder="Your email" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-subject">Subject</Label>
                  <Input id="contact-subject" placeholder="What's this about?" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea id="contact-message" placeholder="Your message" className="min-h-[150px]" />
                </div>

                <Button className="w-full bg-amber-800 hover:bg-amber-900 text-white">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

