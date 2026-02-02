import { Button } from '@/components/ui/button'
import { Compass, RotateCcw } from 'lucide-react'
import React from 'react'

export default function FooterBtnResult() {
    return < div className="flex gap-4 p-6 bg-white border-t " >
        <Button 
            className="flex-1 gap-2 bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
            onClick={() => window.location.reload()}
        >
            <RotateCcw className="w-4 h-4" />
            Restart
        </Button>
        <Button className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 cursor-pointer">
            <Compass className="w-4 h-4" />
            Explore
        </Button>
    </div >
}
