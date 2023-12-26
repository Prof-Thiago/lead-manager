export default function PageWrapper(props: any) {
    return (
        <div className="flex items-center min-w-full box-border min-h-full flex-col justify-center pt-32 pb-10 pr-10 pl-10">
            { props.children }   
        </div>
    )
}