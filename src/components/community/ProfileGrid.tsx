import ProfileCard from './ProfileCard';
import { communityProfiles } from '../../data/communityProfiles';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const ProfileGrid = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {communityProfiles.map((profile) => (
          <ProfileCard key={profile.id} {...profile} />
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileGrid;