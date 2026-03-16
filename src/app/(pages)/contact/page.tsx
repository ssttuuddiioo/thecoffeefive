export default function ContactPage() {
  return (
    <main className="pt-20 md:pt-24">
      <div className="container-site section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Info */}
          <div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-4">Contacto</p>
            <h1 className="text-3xl md:text-4xl font-bold text-coffee-white mb-6 leading-tight">
              Hablemos sobre café.
            </h1>
            <p className="text-sm text-coffee-400 mb-10 leading-relaxed max-w-md">
              Ya sea que busques café verde de especialidad, necesites consultoría para tu finca, o quieras saber más sobre nuestros servicios — estamos aquí para conversar.
            </p>

            <div className="space-y-6 mb-10">
              <div>
                <h3 className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-2">Email</h3>
                <a href="mailto:info@coffeefive.com" className="text-sm text-coffee-white hover:text-coffee-200 transition-colors inline-flex items-center min-h-[44px]">
                  info@coffeefive.com
                </a>
              </div>
              <div>
                <h3 className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-2">WhatsApp</h3>
                <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="text-sm text-coffee-white hover:text-coffee-200 transition-colors inline-flex items-center min-h-[44px]">
                  +57 300 123 4567
                </a>
              </div>
              <div>
                <h3 className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-2">Laboratorio</h3>
                <p className="text-sm text-coffee-white">Medellín, Colombia</p>
              </div>
              <div>
                <h3 className="text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-2">Instagram</h3>
                <a href="https://instagram.com/coffeefive" target="_blank" rel="noopener noreferrer" className="text-sm text-coffee-white hover:text-coffee-200 transition-colors inline-flex items-center min-h-[44px]">
                  @coffeefive
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-coffee-900 rounded-md p-6 md:p-8">
            <h2 className="text-lg font-bold text-coffee-white mb-6">Enviar mensaje</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-2">Nombre</label>
                <input type="text" className="w-full min-h-[44px] bg-transparent border border-coffee-700 rounded-sm px-3 text-sm text-coffee-white placeholder:text-coffee-700 focus:outline-none focus:border-coffee-white transition-colors" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-2">Email</label>
                <input type="email" className="w-full min-h-[44px] bg-transparent border border-coffee-700 rounded-sm px-3 text-sm text-coffee-white placeholder:text-coffee-700 focus:outline-none focus:border-coffee-white transition-colors" placeholder="tu@email.com" />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-2">Asunto</label>
                <select className="w-full min-h-[44px] bg-transparent border border-coffee-700 rounded-sm px-3 text-sm text-coffee-400 focus:outline-none focus:border-coffee-white transition-colors">
                  <option value="">Seleccionar</option>
                  <option value="green">Café Verde — Compra</option>
                  <option value="roasted">Café Tostado</option>
                  <option value="consulting">Consultoría / Asesoría</option>
                  <option value="training">Formación / Cursos</option>
                  <option value="other">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-coffee-400 mb-2">Mensaje</label>
                <textarea rows={5} className="w-full bg-transparent border border-coffee-700 rounded-sm px-3 py-2 text-sm text-coffee-white placeholder:text-coffee-700 focus:outline-none focus:border-coffee-white transition-colors resize-none" placeholder="¿En qué podemos ayudarte?" />
              </div>
              <button type="submit" className="w-full py-3 bg-coffee-white text-coffee-black text-[12px] tracking-[0.1em] uppercase rounded-sm font-medium hover:bg-coffee-200 transition-colors min-h-[44px]">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
