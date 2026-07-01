'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const cabinet = "'Cabinet Grotesk', system-ui, sans-serif";

/* SVG oficial de Google con sus 4 colores */
function GoogleLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18" height="18" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      <path fill="none" d="M0 0h48v48H0z"/>
    </svg>
  );
}

/* Loading spinner — reemplaza el ícono de Google durante el delay de 1.5s */
function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <circle
        cx="9" cy="9" r="7"
        fill="none"
        stroke="#dadce0"
        strokeWidth="2"
      />
      <path
        d="M9 2 A7 7 0 0 1 16 9"
        fill="none"
        stroke="#4285F4"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ animation: 'spin 0.7s linear infinite', transformOrigin: '9px 9px' }}
      />
    </svg>
  );
}

export function GoogleSignInButton() {
  const router   = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (loading) return;
    setLoading(true);

    await new Promise<void>((r) => setTimeout(r, 1500));

    /* Simulated Google user — misma clave que lib/auth usa */
    localStorage.setItem('mouto_logged_in', 'true');
    localStorage.setItem('mouto_user', JSON.stringify({
      id:    'u_google_001',
      name:  'Usuario Google',
      email: 'usuario@gmail.com',
      driverCode:    'GOOG-X1K',
      bio:           '',
      stats:         { amigos: 0, caravanas: 0, autosEnPosesion: 0, autosComprados: 0, autosVendidos: 0 },
      favoriteBrands: [],
    }));

    router.push('/');
  };

  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          width: '100%',
          padding: '12px 24px',
          background: loading ? '#f8f9fa' : '#FFFFFF',
          color: '#3c4043',
          border: '1px solid #dadce0',
          borderRadius: 14,
          fontFamily: cabinet,
          fontSize: 14,
          fontWeight: 500,
          cursor: loading ? 'wait' : 'pointer',
          transition: 'background 150ms ease-out, box-shadow 150ms ease-out',
          boxShadow: loading ? '0 1px 3px rgba(0,0,0,0.20)' : 'none',
          opacity: loading ? 0.85 : 1,
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            (e.currentTarget as HTMLButtonElement).style.background = '#f8f9fa';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.20)';
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            (e.currentTarget as HTMLButtonElement).style.background = '#FFFFFF';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
          }
        }}
      >
        {loading ? <Spinner /> : <GoogleLogo />}
        {loading ? 'Conectando...' : 'Continuar con Google'}
      </button>
    </>
  );
}
