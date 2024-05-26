import { PDFDownloadLink } from '@react-pdf/renderer';
import ProductPdf from './ProductPdf';


const DownloadPdf = ({ productDetails }) => (

    <div className="flex flex-col items-center justify-center w-[110px] ">
        <PDFDownloadLink
            document={<ProductPdf product={productDetails} />}
            fileName={`${productDetails?.name + "_" + productDetails?.userDetails?.name}.pdf`}
            className="bg-blue-500 text-white line-clamp-1 font-bold text-xs px-4 py-1 rounded"
        >
            {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Recept'
            }
        </PDFDownloadLink>
    </div>
);

export default DownloadPdf;
