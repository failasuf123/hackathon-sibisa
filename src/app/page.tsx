"use client"
import { getUserProfile } from "@/utils/users/getUserProfile";
import { useGoogleLogin } from "@react-oauth/google";



export default function Home() {

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-700">
          SIBISA
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-gray-600 mb-6">
          Sistem Intelijen BLT & Inklusi Sosial Adaptif berbasis AI untuk
          memastikan bantuan sosial lebih tepat sasaran, adaptif, transparan,
          dan efisien.
        </p>
        <button
          onClick={() => login()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition cursor-pointer"
        >
          Signin
        </button>
      </section>

      {/* Tujuan Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            Tujuan SIBISA
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <h3 className="font-semibold text-lg mb-2">Akurasi</h3>
              <p>
                Meningkatkan akurasi penentuan penerima BLT dengan analisis
                naratif & data terintegrasi.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <h3 className="font-semibold text-lg mb-2">Transparansi</h3>
              <p>
                Memperkuat transparansi & akuntabilitas dalam tata kelola
                bantuan sosial.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <h3 className="font-semibold text-lg mb-2">Deteksi Anomali</h3>
              <p>
                Mendeteksi potensi penyimpangan & data ganda secara otomatis.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <h3 className="font-semibold text-lg mb-2">
                Rekomendasi Finansial
              </h3>
              <p>
                Memberikan saran edukasi keuangan sesuai kondisi KPM agar
                bantuan lebih tepat guna.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <h3 className="font-semibold text-lg mb-2">
                Monitoring Terintegrasi
              </h3>
              <p>
                Menyediakan sistem monitoring lintas level dari desa hingga
                pusat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fitur Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">Fitur Utama</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <h3 className="font-semibold text-lg mb-2">Formulir Naratif</h3>
              <p>
                10 pertanyaan naratif untuk memahami kondisi KPM secara lebih
                kontekstual.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <h3 className="font-semibold text-lg mb-2">Musyawarah Desa</h3>
              <p>
                Pencatatan digital notulensi untuk memperkuat verifikasi
                berbasis komunitas.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <h3 className="font-semibold text-lg mb-2">Observasi Lapangan</h3>
              <p>
                Petugas lapangan didukung AI & dashboard untuk verifikasi
                obyektif.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <h3 className="font-semibold text-lg mb-2">Analisis AI</h3>
              <p>
                Skor kelayakan 0–100, deteksi anomali, dan rekomendasi adaptif.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Bergabung dengan SIBISA</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Jadilah bagian dari transformasi tata kelola bantuan sosial di
          Indonesia.
        </p>
        <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition">
          Daftar Sekarang
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} SIBISA. Semua Hak Dilindungi.
      </footer>
    </div>
  );
}
