import PageWrapper from '@/components/styles/page-wrapper';

const NotFoundPage = () => {
    return (
        <PageWrapper>
            <div className="grid h-76 w-76 place-items-center text-center bg-white px-6 py-24 sm:py-32 lg:px-8 round-md"> 
                <p className="text-base font-semibold text-indigo-600">404</p>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Page not found</h1>
                <p className="text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
            </div>            
        </PageWrapper>
    )
}

export default NotFoundPage;