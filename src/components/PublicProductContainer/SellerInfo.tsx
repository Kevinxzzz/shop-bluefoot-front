'use client';

import Link from 'next/link';
import { Avatar } from '@/components/Avatar';
import type { PublicProductDetail } from '@/types/productType';
import { getAvatarUrl } from '@/utils';
import styles from './PublicProductContainer.module.scss';

interface SellerInfoProps {
  seller: PublicProductDetail['user'];
}

export function SellerInfo({ seller }: SellerInfoProps) {
  if (!seller) return null;

  const avatarUrl = getAvatarUrl(seller.profilePicture || seller.profileImageUrl, seller.name);

  return (
    <div className={styles.vendorBlock}>
      <h4 className={styles.vendorTitle}>Vendedor</h4>
      <Link href={`/vendedor/${seller.id}`} className={styles.vendorInfo}>
        <Avatar 
          src={avatarUrl} 
          alt={seller.name} 
          size={48} 
        />
        <div>
          <span className={styles.vendorName}>{seller.name}</span>
          <span className={styles.vendorSub}>Ver todos os produtos</span>
        </div>
      </Link>
    </div>
  );
}
