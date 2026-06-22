import { Avatar } from '@/components/Avatar';
import styles from './Perfil.module.scss';

interface ProfileHeaderProps {
  name: string;
  role: string;
  avatarUrl: string | null | undefined;
}

export function ProfileHeader({ name, role, avatarUrl }: ProfileHeaderProps) {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.avatarWrapper}>
        <Avatar 
          src={avatarUrl} 
          alt={name} 
          size={80} 
        />
      </div>
      <div className={styles.profileInfo}>
        <h2 className={styles.profileName}>{name}</h2>
        <span className={styles.profileRole}>{role}</span>
      </div>
    </div>
  );
}
