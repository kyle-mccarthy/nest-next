import { NextPage, GetStaticProps } from 'next';

interface Body {
  message: string;
}

interface Props {
  data: Body | null;
  error: string | null;
}

const Page: NextPage<Props> = ({ data, error }) => {
  return (
    <div>
      <p>nest-next passthrough example</p>

      <p>static props: {data && data.message ? data.message : error}</p>

      <p>
        <a
          href="https://github.com/kyle-mccarthy/nest-next"
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <img
            src="/github-icon-32.png"
            alt="Github"
            width="24"
            height="24"
            style={{ marginRight: '5px' }}
          />
          View Repo
        </a>
      </p>
    </div>
  );
};

// https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export const getStaticProps: GetStaticProps = async () => {
  let data: any | null = null;
  let error: string | null = null;

  try {
    const res = await fetch('http://localhost:3000/data');

    if (res.ok) {
      data = await res.json();
    } else {
      error = res.statusText;
    }
  } catch (e) {
    error = e.message;
  }

  return { props: { data, error } };
};

export default Page;
