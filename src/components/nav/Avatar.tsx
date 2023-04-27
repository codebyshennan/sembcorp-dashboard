import { UserButton } from '@clerk/clerk-react';

const Avatar = () => {
  return (
    <div className="flex items-center">
      <div className="flex items-center ml-3">
        <UserButton />
      </div>
    </div>
  );
};

export default Avatar;
