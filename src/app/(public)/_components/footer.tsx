export function Footer() {
  return (
    <footer className="text-gray-500 text-sm md:text-base py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} OdontoPro. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}