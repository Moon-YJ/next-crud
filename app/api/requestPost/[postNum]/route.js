import { postDB } from '@/app/DB/postData';
import { NextResponse } from 'next/server';

export function GET(req, res) {
	console.log(req.url);
	const { postNum } = res.params;
	return NextResponse.json({ result: postDB[parseInt(postNum)] });
}

export function DELETE(req, res) {
	const { postNum } = res.params;
	return NextResponse.json({
		result: postDB.filter((_, idx) => idx !== parseInt(postNum)),
	});
}
