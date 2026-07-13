"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowRight,
  ShoppingBag,
  SlidersHorizontal,
  X,
  Loader2,
  Check,
  Coins,
} from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";
import { SellAccountCTA } from "@/components/SellAccountCTA";
import ModalConfirm from "@/components/ModalConfirm";
import HomeBannerCarousel from "@/components/HomeBannerCarousel";
import { InstitutionalSection } from "@/components/InstitutionalSection";
import ProductCard from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/SkeletonLoader";
import FilterModal from "@/components/FilterModal";
import { usePublicProducts } from "@/hooks/products/usePublicProducts";
import { usePublicCategories } from "@/hooks/categories/usePublicCategories";
import { usePublicEnterpriseLink } from "@/hooks/enterprise/usePublicEnterpriseLink";
import { FullScreenLoader } from "@/components/ui/FullScreenLoader";
import Footer from "@/components/Footer";
import type { PublicProductFilters } from "@/services/productService";
import styles from "./page.module.scss";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<PublicProductFilters>({});

  const { data: linkData } = usePublicEnterpriseLink();
  const salesGroupLink = linkData?.link || "";

  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      categoryId: categoryParam ? [categoryParam] : undefined,
      search: searchParam || undefined,
    }));
  }, [categoryParam, searchParam]);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePublicProducts({
    categoryId: filters.categoryId,
    search: filters.search,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    limit: 20,
  });

  const { data: categoriesData } = usePublicCategories({ limit: 100 });
  const categories =
    categoriesData?.data.map((c) => ({ id: c.id, name: c.name })) || [];

  const handleFilter = (newFilters: {
    category?: string[];
    minPrice?: number;
    maxPrice?: number;
  }) => {
    setFilters((prev) => ({
      ...prev,
      categoryId: newFilters.category,
      minPrice: newFilters.minPrice,
      maxPrice: newFilters.maxPrice,
    }));
  };

  const activeFilterCount = [
    filters.categoryId && filters.categoryId.length > 0,
    filters.minPrice,
    filters.maxPrice,
  ].filter(Boolean).length;

  const totalItems = data?.pages[0]?.totalItems || 0;
  const products = data?.pages.flatMap((page) => page.products) || [];
  const isEmpty = products.length === 0;

  return (
    <>
      {/* Banner Carousel */}
      <HomeBannerCarousel />

      {/* Products Section */}
      <section id="produtos" className={styles.main}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLeft}>
            <h2 className={styles.sectionTitle}>Produtos</h2>
            {!isLoading && !isError && (
              <span className={styles.resultCount}>
                {totalItems} encontrados
              </span>
            )}
          </div>
          <button
            className={styles.filterBtn}
            onClick={() => setFilterOpen(true)}
            aria-label="Abrir filtros"
          >
            <SlidersHorizontal size={16} />
            Filtros
            {activeFilterCount > 0 && (
              <span className={styles.filterBadge}>{activeFilterCount}</span>
            )}
          </button>
        </div>

        {/* Active Filter Tags */}
        {((filters.categoryId && filters.categoryId.length > 0) || filters.search) && (
          <div className={styles.activeTags}>
            {filters.categoryId && filters.categoryId.length > 0 && (
              <button
                className={styles.activeTag}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, categoryId: undefined }))
                }
              >
                {filters.categoryId.length}{" "}
                {filters.categoryId.length === 1
                  ? "categoria ativa"
                  : "categorias ativas"}{" "}
                <X size={12} />
              </button>
            )}
            {filters.search && (
              <button
                className={styles.activeTag}
                onClick={() => {
                  setFilters((prev) => ({ ...prev, search: undefined }));
                  router.push("/");
                }}
              >
                Busca: "{filters.search}" <X size={12} />
              </button>
            )}
          </div>
        )}

        {isError ? (
          <div className={styles.empty}>
            <span style={{ color: "var(--color-danger)" }}>
              Erro ao carregar os produtos. Tente novamente mais tarde.
            </span>
          </div>
        ) : isLoading ? (
          <div className={styles.grid}>
            {Array.from({ length: 12 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : isEmpty ? (
          <div className={styles.empty}>
            <ShoppingBag size={40} />
            <p>Nenhum produto encontrado</p>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {products.map((product, i) => (
                <ProductCard
                  key={`${product.id}-${i}`}
                  product={product}
                  index={i}
                />
              ))}
            </div>

            {hasNextPage && (
              <div
                className={styles.loadMoreContainer}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2rem",
                }}
              >
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className={styles.ctaBtn}
                  style={{
                    cursor: isFetchingNextPage ? "not-allowed" : "pointer",
                  }}
                >
                  {isFetchingNextPage ? (
                    <>
                      <Loader2
                        size={16}
                        style={{
                          animation: "spin 1s linear infinite",
                          marginRight: "8px",
                        }}
                      />
                      Carregando...
                    </>
                  ) : (
                    "Ver mais produtos"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Institutional Benefits Section */}
      <InstitutionalSection />

      {/* Filter Modal */}
      <FilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        selectedCategory={filters.categoryId}
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        categories={categories}
        showSellerFilter={false}
        onFilter={(f) => {
          handleFilter(f);
          setFilterOpen(false);
        }}
      />
      
      <ModalConfirm
        isOpen={isSellModalOpen}
        title="Quer vender sua conta conosco?"
        variant="promo"
        layout="stacked"
        icon={<Coins size={24} />}
        message={
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "12px", 
            marginTop: "16px", 
            textAlign: "left",
            background: "var(--color-bg-secondary)",
            padding: "16px",
            borderRadius: "var(--radius-lg)",
            border: "1px dashed var(--color-border)"
          }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <Check size={16} style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "2px" }} />
              <span style={{ fontSize: "var(--fs-sm)", color: "var(--color-text)", lineHeight: "1.4" }}>
                <strong>Valor de Revenda:</strong> Pagamos valor de revenda de forma ágil e segura.
              </span>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <Check size={16} style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "2px" }} />
              <span style={{ fontSize: "var(--fs-sm)", color: "var(--color-text)", lineHeight: "1.4" }}>
                <strong>Somente Konami ID:</strong> Processo de transferência limpo e oficial.
              </span>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <Check size={16} style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "2px" }} />
              <span style={{ fontSize: "var(--fs-sm)", color: "var(--color-text)", lineHeight: "1.4" }}>
                <strong>Sem Reembolso:</strong> Compromisso definitivo de ambas as partes.
              </span>
            </div>
          </div>
        }
        confirmText="Quero vender minha conta"
        cancelText="Agora não"
        onConfirm={() => {
          if (salesGroupLink) {
            window.open(salesGroupLink, "_blank", "noopener,noreferrer");
          }
          setIsSellModalOpen(false);
        }}
        onCancel={() => setIsSellModalOpen(false)}
      />

      {!isAuthLoading && !isAuthenticated && (
        <SellAccountCTA onAction={() => setIsSellModalOpen(true)} />
      )}

      <Footer />
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <FullScreenLoader message="" />
      }
    >
      <HomeContent />
    </Suspense>
  );
}
