// app/page.tsx
'use client'

import { useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

const products: Product[] = [
  { id: 1, name: 'אגרטל גדול', price: 149, image: '/api/placeholder/300/300', description: 'אגרטל מודפס תלת מימד באיכות גבוהה' },
  { id: 2, name: 'אגרטל קטן', price: 99, image: '/api/placeholder/300/300', description: 'אגרטל קומפקטי מודפס בתלת מימד' },
  { id: 3, name: 'מעמד לשעון אפל', price: 79, image: '/api/placeholder/300/300', description: 'מעמד מעוצב לשעון אפל' },
  { id: 4, name: 'מארגן כבלים', price: 49, image: '/api/placeholder/300/300', description: 'פתרון יעיל לארגון כבלים' },
]

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-800">Madpis3D</h1>
            <div className="flex gap-4">
              <a href="#contact" className="text-gray-600 hover:text-gray-900">צור קשר</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">אודות</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">הדפסות תלת מימד איכותיות</h2>
          <p className="text-xl text-gray-600">מוצרים מותאמים אישית באיכות גבוהה</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">₪{product.price}</span>
                  <button
                    onClick={() => handleBuyClick(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    קנה עכשיו
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">רכישת {selectedProduct.name}</h3>
              <PayPalScriptProvider options={{ 
                "client-id": "YOUR_PAYPAL_CLIENT_ID",
                currency: "ILS"
              }}>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: selectedProduct.price.toString()
                        }
                      }]
                    })
                  }}
                  onApprove={(data, actions) => {
                    return actions.order!.capture().then((details) => {
                      alert('התשלום בוצע בהצלחה!')
                      setSelectedProduct(null)
                    })
                  }}
                />
              </PayPalScriptProvider>
              <button
                onClick={() => setSelectedProduct(null)}
                className="mt-4 w-full bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                סגור
              </button>
            </div>
          </div>
        )}

        <section id="about" className="my-16">
          <h2 className="text-3xl font-bold mb-6">אודות Madpis3D</h2>
          <p className="text-lg text-gray-700">
            אנחנו מתמחים בהדפסות תלת מימד באיכות גבוהה, עם דגש על דיוק ואיכות חומרים. 
            כל המוצרים שלנו מיוצרים בישראל ועוברים בקרת איכות קפדנית.
          </p>
        </section>

        <section id="contact" className="my-16">
          <h2 className="text-3xl font-bold mb-6">צור קשר</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-lg mb-4">
              מייל: info@madpis3d.co.il<br />
              טלפון: 054-XXXXXXX<br />
              שעות פעילות: א'-ה' 09:00-18:00
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p>© 2025 Madpis3D - כל הזכויות שמורות</p>
          </div>
        </div>
      </footer>
    </div>
  )
}