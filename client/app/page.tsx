import { Coffee, Instagram, Facebook, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import MenuSection from "../components/menu-section"
import ReservationForm from "../components/reservation-form"
import ContactSection from "../components/contact-section"
import HeroSection from "../components/hero-section"
import ImageGallery from "../components/image-gallery"

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-amber-800" />
            <span className="text-xl font-bold text-amber-900">Coffee Haven</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#home" className="text-sm font-medium text-amber-900 hover:text-amber-700">
              Home
            </Link>
            <Link href="#menu" className="text-sm font-medium text-amber-900 hover:text-amber-700">
              Menu
            </Link>
            <Link href="#reservation" className="text-sm font-medium text-amber-900 hover:text-amber-700">
              Reservation
            </Link>
            <Link href="#gallery" className="text-sm font-medium text-amber-900 hover:text-amber-700">
              Gallery
            </Link>
            <Link href="#contact" className="text-sm font-medium text-amber-900 hover:text-amber-700">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:flex border-amber-800 text-amber-800 hover:bg-amber-100">
              Sign In
            </Button>
            <Button className="bg-amber-800 text-white hover:bg-amber-900">Order Online</Button>
            <button className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-900"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Menu Section */}
        <MenuSection />

        {/* Reservation Section */}
        <section id="reservation" className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-amber-900 mb-4">Reserve Your Table</h2>
              <p className="text-amber-700 max-w-2xl mx-auto">
                Skip the wait and reserve your perfect spot. Whether it's a quiet corner for work or a larger table for
                friends, we've got you covered.
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <ReservationForm />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-amber-100">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-amber-900 mb-4">Our Story</h2>
                <p className="text-amber-700 mb-6">
                  Coffee Haven was born from a simple passion: creating a warm, welcoming space where quality coffee
                  brings people together. Since 2015, we've been serving carefully sourced beans, expertly roasted and
                  prepared with love.
                </p>
                <p className="text-amber-700 mb-6">
                  Our cozy shop has become a neighborhood fixture, where regulars are family and newcomers quickly feel
                  at home. We believe great coffee is just the beginning – it's the conversations, connections, and
                  community that truly matter.
                </p>
                <Button className="bg-amber-800 text-white hover:bg-amber-900">Learn More</Button>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Coffee shop interior with people enjoying coffee"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-amber-900 mb-4">Our Gallery</h2>
              <p className="text-amber-700 max-w-2xl mx-auto">
                Take a visual tour of our coffee shop, from our carefully crafted beverages to our inviting atmosphere.
              </p>
            </div>
            <ImageGallery />
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Coffee className="h-6 w-6" />
                <span className="text-xl font-bold">Coffee Haven</span>
              </div>
              <p className="text-sm text-amber-200">
                A modern coffee shop with a cozy atmosphere, serving premium coffee and delicious treats.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#home" className="text-amber-200 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#menu" className="text-amber-200 hover:text-white">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link href="#reservation" className="text-amber-200 hover:text-white">
                    Reservation
                  </Link>
                </li>
                <li>
                  <Link href="#gallery" className="text-amber-200 hover:text-white">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-amber-200 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Hours</h3>
              <ul className="space-y-2 text-amber-200">
                <li>Monday - Friday: 7am - 8pm</li>
                <li>Saturday: 8am - 9pm</li>
                <li>Sunday: 8am - 7pm</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                <Link href="#" className="text-amber-200 hover:text-white">
                  <Instagram className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-amber-200 hover:text-white">
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-amber-200 hover:text-white">
                  <Twitter className="h-6 w-6" />
                </Link>
              </div>
              <p className="text-sm text-amber-200">Subscribe to our newsletter for updates and special offers.</p>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-8 pt-8 text-center text-sm text-amber-200">
            <p>&copy; {new Date().getFullYear()} Coffee Haven. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

