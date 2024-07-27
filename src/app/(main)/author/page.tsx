import Image from "next/image";

export default function AuthorPage(){
    return (
        <section className="font-vietnam py-20">
            <div className="container mx-auto space-y-2">
                <h1 className="text-3xl font-medium">Ini Halaman Sang Penulis ✨</h1>
                <Image
                    className="w-[150px] h-[200px] rounded-md shadow"
                    src="/author-image.jpg"
                    alt="giant"
                    width={350}
                    height={185}
                />
                <div className="text-secondary text-sm">
                    <p>
                        Hai! 👋
                        <br/>
                        Perkenalkan, aku sang author, Giant.
                        <br/>
                        <br/>
                        Dia adalah penulis dan pembuat website ini.
                        <br/>
                        Tujuan website ini dibuat sebenarnya untuk aku belajar dalam membuat website yang lebih baik,
                        <br/>
                        namun website ini juga bertujuan untuk kenangan kepada teman-teman aku yang sebentar lagi akan berpisah untuk menempuh pendidikan mereka.
                        <br/>
                        <br/>
                        Author mempunyai hobi memainkan alat musik dan mendengarkan lagu.
                        <br/>
                    </p>
                    <div className="pt-4">
                        <p>
                            Lagu kesukaan author adalah:
                        </p>
                        <ul>
                            <li>&quot;One Only&quot; - Pamungkas</li>
                            <li>&quot;Creep - Acoustic&quot; - Radiohead</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}