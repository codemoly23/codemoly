export default function Video() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Watch Our
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Story
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover how we&apos;re transforming the industry through
              innovation and empowering developers worldwide
            </p>
          </div>

          <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
            <video
              className="w-full h-full object-cover"
              controls
              poster="/video-poster.jpg"
            >
              <source src="/demo-video.mp4" type="video/mp4" />
              <source src="/demo-video.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
