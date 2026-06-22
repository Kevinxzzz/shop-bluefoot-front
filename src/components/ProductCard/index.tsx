import Link from 'next/link';
import Image from 'next/image';
import { Avatar } from '@/components/Avatar';
import { Eye } from 'lucide-react';
import { formatPrice, formatViews, getAvatarUrl } from '@/utils';
import type { Product } from '@/types';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const mainImage = product.media?.find(m => m.isMain && m.type === 'image')
    || product.media?.find(m => m.type === 'image');
  const imageUrl = mainImage?.fileUrl || '/placeholder-product.svg';

  return (
    <Link
      href={`/produto/${product.id}`}
      className={styles.card}
      style={{ animationDelay: `${index * 60}ms` }}
      aria-label={`Ver ${product.title} por ${formatPrice(product.price)}`}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={product.title}
          width={400}
          height={400}
          loading={index < 4 ? 'eager' : 'lazy'}
          unoptimized
        />
        {product.category && (
          <span className={styles.badge}>{product.category.name}</span>
        )}
        <span className={styles.views}>
          <Eye size={12} aria-hidden="true" />
          {formatViews(product.countViews)}
        </span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
        </div>

        {product.seller && (
          <div className={styles.vendor}>
            <Avatar 
              src={getAvatarUrl(product.seller.profilePicture, product.seller.name)} 
              alt={product.seller.name} 
              size={24} 
            />
            <span className={styles.vendorName}>{product.seller.name}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
