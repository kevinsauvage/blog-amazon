import Container from '@/components/Container/Container';
import { fetchPage } from '@/lib/api/pages';

import styles from './DynamicPage.module.scss';

const DynamicPage = async ({ slug, children }) => {
  const pageData = await fetchPage({ slug });
  const { title, description, contentHtml } = pageData || {};
  return (
    <div className={styles.page}>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <Container>
        <main>
          {contentHtml && (
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: contentHtml }} />
          )}
          {children}
        </main>
      </Container>
    </div>
  );
};

export default DynamicPage;
