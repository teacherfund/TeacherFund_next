import React from 'react'

class CashFlowTable extends React.Component {
    render() {
        return (
            <div class="cfTable">
                <span><strong>type</strong></span>
                <span><strong>donor/recipient</strong></span>
                <span><strong>amount</strong></span>
                <span><strong>date</strong></span>

                <span>in</span>
                <span>Kiya Berger</span>
                <span>1,000</span>
                <span>2019-03-24</span>

                <span>in</span>
                <span>Junaid Church</span>
                <span>200</span>
                <span>2019-03-20</span>

                <span>out</span>
                <span>Kole Hawkins</span>
                <span>300</span>
                <span>2019-02-01</span>

                <span>in</span>
                <span>Anne-Marie North</span>
                <span>50.25</span>
                <span>2018-12-25</span>

                <span>out</span>
                <span>Deniz Whittle</span>
                <span>850</span>
                <span>2018-10-30</span>

                <span>out</span>
                <span>Jamelia Robin</span>
                <span>120</span>
                <span>2018-09-08</span>
            </div>
        );
    }
}

export default CashFlowTable