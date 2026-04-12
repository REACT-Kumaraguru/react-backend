import logoImg from '../assets/images/logo.png';

/** React wordmark; `brightness-0` renders the asset as black for sidebar use. */
export default function WorkplaceLogo({ className = 'h-7 max-w-[9rem]' }) {
  return (
    <img
      src={logoImg}
      alt="React"
      className={`w-auto object-left object-contain brightness-0 ${className}`}
      width={120}
      height={28}
    />
  );
}
