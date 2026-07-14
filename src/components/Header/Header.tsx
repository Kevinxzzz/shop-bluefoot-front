"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Moon,
  Sun,
  Menu,
  X,
  LayoutDashboard,
  ShoppingBag,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/hooks/auth/useAuth";
import { usePublicEnterpriseLink } from "@/hooks/enterprise/usePublicEnterpriseLink";
import styles from "./Header.module.scss";

function SearchSection() {
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(currentSearch);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const router = useRouter();

  // Sync state if search query in URL changes
  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  return (
    <div
      className={`${styles.searchWrapper} ${isSearchActive ? styles.active : ""}`}
    >
      <button
        className={styles.iconBtn}
        onClick={() => setIsSearchActive(!isSearchActive)}
        aria-label="Buscar"
      >
        {isSearchActive ? <X size={18} /> : <Search size={18} />}
      </button>
      {isSearchActive && (
        <>
          <div
            className={styles.searchBackdrop}
            onClick={() => setIsSearchActive(false)}
          />
          <div className={styles.searchInputContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="O que você procura?"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const val = searchValue.trim();
                  if (val) {
                    router.push(`/?search=${encodeURIComponent(val)}#produtos`);
                  } else {
                    router.push("/");
                  }
                  setIsSearchActive(false);
                }
                if (e.key === "Escape") {
                  setIsSearchActive(false);
                }
              }}
            />
            {searchValue && (
              <button
                className={styles.clearBtn}
                onClick={() => {
                  setSearchValue("");
                  router.push("/");
                  setIsSearchActive(false);
                }}
                aria-label="Limpar busca"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const { data: linkData } = usePublicEnterpriseLink();
  const salesGroupLink = linkData?.link || "https://chat.whatsapp.com/";

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/vendedores", label: "Vendedores" },
    {
      href: salesGroupLink,
      label: "Vender sua conta",
      isSpecial: true,
    },
  ];

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.isScrolled : ""} ${pathname === "/" ? styles.isHome : ""}`}
      >
        <div className={styles.container}>
          <div className={styles.left}>
            <Link href="/" className={styles.logo}>
              <div className={styles.logoContainer}>
                <Image
                  src="/logo-branco-BlueFoot.png"
                  alt="BlueFoot Logo"
                  width={48}
                  height={48}
                  className={`${styles.logoImg} ${styles.logoWhite}`}
                  priority
                />
                <Image
                  src="/logo-preto-Bluefoot.png"
                  alt="BlueFoot Logo"
                  width={48}
                  height={48}
                  className={`${styles.logoImg} ${styles.logoBlack}`}
                  priority
                />
              </div>

            </Link>
          </div>

          <nav className={styles.navCenter}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ""} ${link.isSpecial ? styles.specialLink : ""}`}
                target={link.isSpecial ? "_blank" : undefined}
                rel={link.isSpecial ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.right}>
            <Suspense fallback={null}>
              <SearchSection />
            </Suspense>

            <button
              className={`${styles.iconBtn} ${styles.themeBtn}`}
              onClick={toggleTheme}
              aria-label="Mudar tema"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {user && (
              <Link href="/dashboard" className={styles.primaryBtn}>
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>
            )}

            <button
              className={styles.hamburgerBtn}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.open : ""}`}
      >
        <div
          className={styles.mobileBackdrop}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className={styles.mobileMenu}>
          <div className={styles.mobileHeader}>
            <div className={styles.logo}>
              <div className={styles.logoContainer}>
                <Image
                  src="/logo-branco-BlueFoot.png"
                  alt="BlueFoot Logo"
                  width={42}
                  height={42}
                  className={`${styles.logoImg} ${styles.logoWhite}`}
                />
                <Image
                  src="/logo-preto-Bluefoot.png"
                  alt="BlueFoot Logo"
                  width={42}
                  height={42}
                  className={`${styles.logoImg} ${styles.logoBlack}`}
                />
              </div>
              <span className={styles.logoText}>
                <strong>Blue</strong>foot
              </span>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
          </div>

          <nav className={styles.mobileNav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileNavLink} ${link.isSpecial ? styles.specialLink : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
                target={link.isSpecial ? "_blank" : undefined}
                rel={link.isSpecial ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <Link
                href="/dashboard"
                className={`${styles.mobileNavLink} ${styles.mobileNavHighlight}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            )}
          </nav>

          <div className={styles.mobileThemeSection}>
            <button onClick={toggleTheme} className={styles.mobileThemeBtn}>
              {theme === "dark" ? (
                <>
                  <Sun size={18} />
                  <span>Tema Claro</span>
                </>
              ) : (
                <>
                  <Moon size={18} />
                  <span>Tema Escuro</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
