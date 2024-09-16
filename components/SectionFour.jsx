"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SectionFour = ({ blogs }) => {
  return (
    <section className="container py-5 mb-5">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h2 className="fw-bold mb-3">Latest Blogs</h2>
        </div>
      </div>
      <div className="row">
        {blogs.slice(0, 3).map((blog, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 bg-white border-0 card-shadow d-flex flex-column">
              <div className="card-img-top">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  layout="responsive"
                  width={400}
                  height={250}
                  objectFit="cover"
                  className="rounded rounded-bottom-0"
                />
              </div>
              <div className="card-body p-4 text-start d-flex flex-column">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text flex-grow-1">{blog.excerpt}</p>
                <div className="mt-auto">
                  <Link href={blog.url} passHref>
                    <button className="btn btn-dark btn-sm">Read More</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionFour;
