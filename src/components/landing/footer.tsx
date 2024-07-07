import { jost } from '@/src/utils/font';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <div
      className={`${jost.className} flex justify-center bg-black text-white border-t border-gray py-3`}
    >
      <FontAwesomeIcon className="text-white pr-2" width={20} icon={faCopyright} />
      <p>Tout droits réservés Edition Limtée-Elune</p>
    </div>
  );
}
