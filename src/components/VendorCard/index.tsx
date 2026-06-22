import Link from 'next/link';
import { Avatar } from '@/components/Avatar';
import { Package, ArrowRight } from 'lucide-react';
import { getAvatarUrl } from '@/utils';
import type { PublicSeller } from '@/types';
import styles from './VendorCard.module.scss';

interface VendorCardProps {
  vendor: PublicSeller;
}

export default function VendorCard({ vendor }: VendorCardProps) {
  return (
    <Link href={`/vendedor/${vendor.id}`} className={styles.card}>
      <Avatar 
        src={getAvatarUrl(vendor.imageUrl || '', vendor.name)} 
        alt={vendor.name} 
        className={styles.avatar}
      />
      <h3 className={styles.name}>{vendor.name}</h3>
      <span className={styles.meta}>
        <Package size={14} aria-hidden="true" />
        {vendor.productsCount} {vendor.productsCount === 1 ? 'produto' : 'produtos'}
      </span>
      <span className={styles.button}>
        Ver loja <ArrowRight size={14} />
      </span>
    </Link>
  );
}
