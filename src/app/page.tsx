import HomeContent from '@/components/HomeContent';

export default function Home() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <HomeContent />
        </div>
      </div>
    </div>
  );
}
