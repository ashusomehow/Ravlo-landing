import React from "react";

const Footer = () => (
  <footer className="w-full mt-12 border-t border-border py-6 bg-background text-center text-muted-foreground text-sm">
    <div>
      Made with <span className="text-red-500">❤️</span> by
      <a href="https://www.linkedin.com/in/ashusomehow/" target="_blank" rel="noopener noreferrer" className="underline mx-1">Ashutosh Rai</a>
      | &copy; 2025 Ravlo. All rights reserved.
    </div>
    <div className="mt-2 space-x-4">
      <a href="/privacy" className="hover:underline">Privacy Policy</a>
      <a href="/terms" className="hover:underline">Terms</a>
      <a href="/faq" className="hover:underline">FAQ</a>
    </div>
  </footer>
);

export default Footer; 