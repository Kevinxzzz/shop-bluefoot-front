import { Avatar } from '@/components/Avatar';
import { MessageCircle, Package } from 'lucide-react';
import { getAvatarUrl, ensureExternalLink } from '@/utils';
import type { PublicVendorDetail } from '@/types';
import styles from './VendorStore.module.scss';

interface VendorBannerProps {
  vendor: PublicVendorDetail;
  productsCount: number;
}

export default function VendorBanner({ vendor, productsCount }: VendorBannerProps) {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerBg} />
      <div className={styles.bannerContent}>
        <Avatar 
          src={getAvatarUrl(vendor.profileImageUrl || '', vendor.name)} 
          alt={vendor.name} 
          size={112} 
        />
        <div className={styles.bannerInfo}>
          <h1 className={styles.vendorName}>{vendor.name}</h1>
          <span className={styles.vendorMeta}>
            <Package size={16} aria-hidden="true" />
            {productsCount} {productsCount === 1 ? 'produto' : 'produtos'}
          </span>
        </div>
        {vendor.contactLink ? (
          <a
            href={ensureExternalLink(vendor.contactLink)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactBtn}
          >
            <MessageCircle size={18} aria-hidden="true" />
            Entre em contato
          </a>
        ) : (
          <button
            className={`${styles.contactBtn} ${styles.disabled}`}
            disabled
            aria-label="Contato do vendedor não disponível"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Entre em contato
          </button>
        )}
      </div>
    </div>
  );
}
