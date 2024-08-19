import { jost } from '@/src/utils/font';
import { Copyright } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div
      className={`${jost.className} flex justify-center bg-black text-white border-t border-gray py-3`}
    >
      <Copyright className="text-white pr-2" width={20} />
      <p>Tout droits réservés Edition Limtée-Elune - {year} </p>
    </div>
  );
}
