import ProfileMenu from '@/layouts/profile-menu';

export default function HeaderMenuRight() {
  return (
    <div className="ml-auto grid shrink-0 grid-cols-1 items-center gap-2 text-gray-700">
      <ProfileMenu />
    </div>
  );
}
