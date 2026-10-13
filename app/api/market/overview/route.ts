import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    ok: true,
    data: {
      indices: [
        { name: 'Nifty 50', value: '24,532', change: '+0.82%' },
        { name: 'Bank Nifty', value: '52,614', change: '+1.04%' },
        { name: 'Sensex', value: '80,124', change: '+0.77%' },
        { name: 'USD/INR', value: '83.12', change: '-0.22%' },
        { name: 'Gold', value: '72,460', change: '+0.31%' }
      ],
      marketStatus: 'open',
      disclaimer: 'Sample market overview served by local preview. Connect a live OHLCV provider for production data.'
    }
  })
}
