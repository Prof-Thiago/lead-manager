import { Fragment } from "react";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

function Layout(props: any) {
    return (
    <Fragment>
        <main className={`flex min-h-screen box-border flex-col items-center justify-between p-0 min-w-full ${inter.className}`}>{ props.children }</main>
    </Fragment>
    );
};

export default Layout;