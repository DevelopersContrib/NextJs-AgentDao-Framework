import axios from 'axios'

export const POST = async (request) => {
	const data = await request.json();
	
	try {
		const params = new URLSearchParams();
		params.append('field', 'EmailAddress');
		params.append('value', data.email);
		const checkRes = await axios.post('https://www.contrib.com/signup/checkexist', params);
		
		if(checkRes.data.status===0){
			const params = new URLSearchParams();
			params.append('partnertype', data.partnershiptype);
			params.append('domain', data.domain);
			//params.append('domain', 'javapoint.com');
			params.append('firstname', data.fname);
			params.append('lastname', data.lname);
			params.append('email', data.email);
			params.append('country_id', data.country);
			params.append('country', data.country_text);
			params.append('city', data.city);
			params.append('password', data.password);
			params.append('phone', data.phone);
			params.append('message', data.message);
			params.append('company', data.companytitle);
			params.append('companydesc', data.companydesc);
			console.log('params',params)
			const saveRes = await axios.post('https://www.contrib.com/forms/save_partner', params);
			console.log('saveRes.data',saveRes.data)
			if(saveRes.data.success){
				const emailCode = saveRes.data.email;
				
				const params = new URLSearchParams();
				params.append('form_type', 'VNOC Partnership');
				params.append('partner_type', data.partnershiptype);
				params.append('domain', data.domain);
				params.append('firstName', data.firstName);
				params.append('lastName', data.lastName);
				params.append('email', data.email);
				params.append('country', data.country)
				params.append('city', data.city);
				params.append('password', data.password);
				params.append('phone', data.phone);
				params.append('message', data.message);
				params.append('title', data.companytitle);
				
				const addleadRes = await axios.post('https://manage.vnoc.com/salesforce/addlead', params);
				
				return new Response(JSON.stringify({status:true,code:emailCode, addlead:addleadRes.data}), { status: 201 })
			}else{
				return new Response(JSON.stringify({status:false,'result': saveRes.data, error:"Failed to save partner"}), { status: 201 });
			}
		}else{
			return new Response(JSON.stringify({status:false,error:'Email already exists'}), { status: 201 })
		}
	} catch (error) {
		return new Response("An error occurred", { status: 500 });
	}
}
