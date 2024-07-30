import axios from "axios";

const AddPlan = async ({ content }) => {
    const { address } = content;
    const memo = "테스트";
    const content_id = 1;
    console.log(memo, address);
    try {
        await axios.post('http://localhost:8000/api/add_plan', {
            list_address: address,
            memo: memo,
            content_id: content_id
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Plan added successfully');
    } catch (error) {
        console.error('Error adding plan:', error);
    }
}

const DeletePlan = async ( list_id ) => {
    try {
        await axios.delete('http://localhost:8000/api/delete_plan', {
            data: { list_id: list_id }, 
            headers: {
                'Content-Type': 'application/json',
            },
        });
        alert("delete complete");
        console.log(list_id);
    } catch (error) {
        console.error('Error deleting plan:', error);
    }
}

export { AddPlan, DeletePlan };