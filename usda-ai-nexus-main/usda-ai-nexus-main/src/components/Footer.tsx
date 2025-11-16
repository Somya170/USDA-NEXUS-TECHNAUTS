const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AI</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">USDA AI Use Case Inventory</div>
              <div className="text-xs text-muted-foreground">United States Department of Agriculture</div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground text-center md:text-right">
            <div>© {new Date().getFullYear()} U.S. Department of Agriculture</div>
            <div className="mt-1">All Rights Reserved</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
