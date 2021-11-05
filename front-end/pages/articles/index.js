export const getStaticProps = async () => {
    const res = await fetch('http://localhost:1337/Articles')
    const data = await res.json()

    return {
        props: {
            articles: data
        }
    }
}

export default function Articles({ articles }) {
    console.log(articles)
    return (
        <div>
            <h1>Articles</h1>
            {articles.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                </div>
            ))}
        </div>
    )
}
