import PageBannerWrapper from '@/components/_scopes/listing/PageBannerWrapper/PageBannerWrapper';
import Container from '@/components/Container/Container';
import pageMetadatas from '@/metadatas/pages';

import styles from './page.module.scss';

function page() {
  return (
    <div className={styles.page}>
      <PageBannerWrapper
        title="About Us"
        subtitle="Hello there! I'm delighted to have you visit [Your Blog Name]. This blog is a space
            where I share my thoughts, insights, and experiences on a wide range of topics. Whether
            you're seeking inspiration, information, or simply a moment of relaxation,
            you've come to the right place."
      />
      <Container>
        <div className={styles.content}>
          <h3>What You&apos;ll Find on [Your Blog Name]</h3>

          <p>
            [Your Blog Name] covers a diverse array of subjects, ranging from personal growth and
            productivity tips to travel adventures, book recommendations, technology insights, and
            much more. I believe that learning is a lifelong journey, and my aim is to provide
            valuable content that entertains, educates, and sparks curiosity.
          </p>

          <h3>Why I Started [Your Blog Name]</h3>

          <p>
            I started [Your Blog Name] out of my deep passion for sharing knowledge and connecting
            with like-minded individuals. I believe that each person has a unique story to tell, and
            I&apos;m here to share mine while also providing a platform for others to engage and
            contribute. Together, we can embark on a journey of discovery and growth.
          </p>

          <h3>Join the [Your Blog Name] Community</h3>

          <p>
            [Your Blog Name] is not just a blog; it&apos;s a community of curious minds, learners,
            and dreamers. I invite you to actively participate in this community by leaving
            comments, sharing your thoughts, and engaging in respectful discussions. Let&apos;s
            create a supportive environment where we can inspire and learn from one another.
          </p>

          <h3>Contact Me</h3>

          <p>
            If you have any questions, suggestions, or simply want to connect, please feel free to
            reach out to me at [Your Contact Email]. I&apos;m always thrilled to hear from readers
            and engage in meaningful conversations.
          </p>

          <p className={styles.conclusion}>
            Thank you for joining me on this adventure with [Your Blog Name]. I hope that through
            our shared exploration, we can ignite our curiosity, broaden our perspectives, and make
            meaningful connections. Together, let&apos;s embrace the joy of continuous learning and
            discovery!
          </p>
        </div>
      </Container>
    </div>
  );
}

export default page;

export const metadata = pageMetadatas.about;
