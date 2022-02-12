import Button from "../components/Button/Button";
import Layout from "../components/Layout/Layout";
import InputNumber from "../components/Input/InputNumber";
import Selector from "../components/Selector/Selector";

export default function Home() {
  return (
    <Layout>
      <div className="flex items-center h-screen w-full bg-slate-200">
        <form className="container w-96 mx-auto p-8">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="mb-4">
              <div className="items-center">
                {/* <h3 className="ml-2">BUSD</h3> */}
                <Selector />
              </div>
              <InputNumber placeholder="Input amount here" id="exchange" />
              <label
                htmlFor="exchange"
                className="mb-1 mt-2 text-xs justify-end flex font-light"
              >
                Your Balance: 012301921
              </label>
            </div>
            <div className="mb-4">
              <div className="items-center">
                <Selector tokenName='EDIPI Token' image='plas' />
              </div>
              <InputNumber disabled={true} placeholder="You will receive" id="exchangeTo" />
            </div>
            <div className="mx-auto flex justify-center">
              <Button title="Swap" customClasses="w-full flex" />
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
