"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section id="home" className="relative h-[600px] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="Coffee shop ambiance with people enjoying coffee"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>
      <div className="container relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Experience the Perfect Brew</h1>
          <p className="text-lg md:text-xl mb-8">
            Handcrafted coffee, artisanal pastries, and a warm atmosphere to make your day better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg"
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Our Menu
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-blue hover:text-amber-900 px-8 py-6 text-lg border-2"
              onClick={() => document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" })}
            >
              Reserve a Table
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

