"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Navigation, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function InteractiveMap() {
  const [zoom, setZoom] = useState(1)
  const [showDirections, setShowDirections] = useState(false)

  return (
    <div className="relative h-[300px] rounded-lg overflow-hidden border border-amber-200">
      <div className="relative h-full w-full" style={{ overflow: "hidden" }}>
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "center",
            transition: "transform 0.3s ease-out",
            height: "100%",
            width: "100%",
            position: "relative",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Map showing coffee shop location"
            fill
            className="object-cover"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-amber-800 text-white p-2 rounded-full animate-pulse">
              <MapPin className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-2 right-2 flex flex-col gap-2">
        <Button
          size="icon"
          variant="secondary"
          className="bg-white/90 hover:bg-white"
          onClick={() => setZoom((prev) => Math.min(prev + 0.1, 1.5))}
        >
          <ZoomIn className="h-4 w-4 text-amber-900" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="bg-white/90 hover:bg-white"
          onClick={() => setZoom((prev) => Math.max(prev - 0.1, 1))}
        >
          <ZoomOut className="h-4 w-4 text-amber-900" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="bg-white/90 hover:bg-white"
          onClick={() => setShowDirections(!showDirections)}
        >
          <Navigation className="h-4 w-4 text-amber-900" />
        </Button>
      </div>

      {/* Info Box */}
      <div className="absolute bottom-0 left-0 right-0 bg-amber-800/90 text-white p-3">
        <p className="text-sm font-medium">Coffee Haven</p>
        <p className="text-xs">123 Coffee Street, Brewville, CA 94123</p>
      </div>

      {/* Directions Panel */}
      {showDirections && (
        <div className="absolute top-0 left-0 bottom-0 bg-white/95 p-4 w-64 overflow-y-auto">
          <h4 className="font-medium text-amber-900 mb-2">Directions to Coffee Haven</h4>
          <ol className="text-sm text-amber-800 space-y-2 list-decimal list-inside">
            <li>Head north on Main St toward 1st Ave</li>
            <li>Turn right onto Oak St</li>
            <li>Continue for 0.5 miles</li>
            <li>Turn left onto Coffee St</li>
            <li>Destination will be on your right</li>
          </ol>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 w-full border-amber-800 text-amber-800"
            onClick={() => setShowDirections(false)}
          >
            Close
          </Button>
        </div>
      )}
    </div>
  )
}

