interface HeaderProps {
  headerLabel: string;
}

const Header: React.FC<HeaderProps> = ({
  headerLabel,
}) => {
  return (
    <div className="mb-6 flex flex-row justify-between items-center">
      <h1 className="text-lg md:text-3xl font-semibold text-sidebar-foreground">
        {headerLabel}
      </h1>
    </div>
  );
};

export default Header;
