"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SmartLink from "@/components/SmartLink";
import type { SiteConfig } from "@/lib/types";

export default function Header({ site }: { site: SiteConfig }) {
  const pathname = usePathname();
  const [fixed, setFixed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // HEADER FIXED — add .navbar-fixed once scrolled past 100px (matches functions.js).
  useEffect(() => {
    const onScroll = () => setFixed(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="header header-1 header-transparent" id="navbar-spy">
      <nav
        className={`navbar navbar-expand-lg navbar-bordered navbar-sticky${fixed ? " navbar-fixed" : ""}`}
        id="primary-menu"
      >
        <div className="container">
          <Link className="navbar-brand" href="/">
            <img className="logo logo-light" src={site.logo} alt={site.brand} style={{ borderRadius: 12 }} />
            <img className="logo logo-dark" src={site.logo} alt={site.brand} style={{ borderRadius: 12 }} />
          </Link>

          <button
            className={`navbar-toggler${mobileOpen ? "" : " collapsed"}`}
            type="button"
            aria-controls="navbarContent"
            aria-expanded={mobileOpen}
            aria-label="Alternar navegação"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`collapse navbar-collapse${mobileOpen ? " show" : ""}`} id="navbarContent">
            <ul className="navbar-nav ml-auto">
              {site.nav.map((item) => {
                if (item.children) {
                  return (
                    <li
                      key={item.label}
                      className={`nav-item has-dropdown${isActive(item.href) ? " current" : ""}${dropdownOpen ? " show" : ""}`}
                    >
                      <a
                        className="dropdown-toggle"
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          setDropdownOpen((v) => !v);
                        }}
                      >
                        <span>{item.label}</span>
                      </a>
                      <ul className="dropdown-menu">
                        {item.children.map((child) => (
                          <li className="nav-item" key={child.href}>
                            <SmartLink href={child.href}>
                              <span>{child.label}</span>
                            </SmartLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }
                return (
                  <li
                    key={item.label}
                    className={`nav-item${isActive(item.href) ? " current" : ""}`}
                  >
                    <SmartLink href={item.href} download={item.download}>
                      <span>{item.label}</span>
                    </SmartLink>
                  </li>
                );
              })}
            </ul>

            <div className="module-container">
              <div className="module-contact">
                <SmartLink className="btn btn--primary" href="/contato#orcamento">
                  Orçamento
                </SmartLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
