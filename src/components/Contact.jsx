import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BiLogoGmail } from 'react-icons/bi';
import { BsGithub } from 'react-icons/bs';
import { IoLogoLinkedin } from 'react-icons/io5';
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Formspree endpoint: replace the placeholder with your Formspree form URL (e.g. https://formspree.io/f/abcdefg)
  // If you leave the placeholder the component will fall back to opening the user's mail client (mailto:)
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaqdjngd';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSuccess(false);

    if (!name || !email || !message) {
      setError('Please fill in name, email and message.');
      return;
    }

    setIsSending(true);

    try {
      if (FORMSPREE_ENDPOINT.includes('your_form_id_here')) {
        // fallback to mail client when Formspree is not configured
        const subject = encodeURIComponent(`Portfolio contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nWebsite: ${website}\n\n${message}`);
        window.location.href = `mailto:prajapatikeshav497@gmail.com?subject=${subject}&body=${body}`;
        setIsSuccess(true);
      } else {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ name, email, website, message, _replyto: email }),
        });

        if (res.ok) {
          setIsSuccess(true);
          setName('');
          setEmail('');
          setWebsite('');
          setMessage('');
        } else {
          const data = await res.json();
          throw new Error(data?.error || 'Submission failed');
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to send message');
    } finally {
      setIsSending(false);
    }
  }; 

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className='lg:my-16 lg:px-28 my-8 px-5'
      id='contact'
    >
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className='text-2xl lg:text-4xl text-center'
      >
        Contact <span className='font-extrabold'>Me</span>
      </motion.h2>

      <div className='flex justify-between items-center mt-8 lg:mt-16 flex-col lg:flex-row'>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className='lg:w-[40%]'
        >
          <form
            className='w-full space-y-3 lg:space-y-5'
            onSubmit={handleSubmit}
            aria-busy={isSending}
          >
            {isSuccess && (
              <div role="status" aria-live="polite" className="text-green-600 font-medium">Thanks — your message was sent.</div>
            )}
            {error && (
              <div role="status" aria-live="polite" className="text-red-600 font-medium">{error}</div>
            )}

            <input
              className='border-2 px-5 py-3 border-black rounded placeholder:text-[#71717A] text-sm w-full'
              type="text"
              placeholder='Your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className='border-2 px-5 py-3 border-black rounded placeholder:text-[#71717A] text-sm w-full'
              type="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className='border-2 px-5 py-3 border-black rounded placeholder:text-[#71717A] text-sm w-full'
              type="text"
              placeholder='Your website (If exists)'
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <textarea
              className='resize-none border-2 px-5 py-3 h-32 border-black placeholder:text-[#71717A] rounded text-sm w-full'
              placeholder='How can I help?*'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
              className='flex justify-between gap-3 lg:gap-5 flex-col lg:flex-row'
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                type='submit'
                disabled={isSending}
                className={`bg-black justify-center w-fit lg:w-auto lg:flex-1 hover:shadow-lg text-white px-3 py-2 rounded flex items-center gap-x-3 font-medium ${isSending ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {isSending ? 'Sending...' : 'Get In Touch'}
              </motion.button>

              <div className='flex items-center gap-x-2 lg:gap-x-5'>
                {[
                  { Icon: BiLogoGmail, href: 'mailto:prajapatikeshav497@gmail.com', label: 'Email' },
                  { Icon: IoLogoLinkedin, href: 'https://www.linkedin.com/in/keshav-prajapati-759ba8314/', label: 'LinkedIn' },
                  { Icon: BsGithub, href: 'https://github.com/kpcode11', label: 'GitHub' },
                ].filter(link => link.href).map(({ Icon, href, label }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="bg-white p-2 lg:p-3 rounded border-2 border-black"
                    whileHover={{ scale: 1.1, backgroundColor: "#000", color: "#fff" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </form>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className='lg:w-1/2'
        >
          <div className='font-extrabold text-2xl lg:text-5xl mt-5 lg:mt-0 space-y-1 lg:space-y-3'>
            <h2>Let's <span className='text-white' style={{ WebkitTextStroke: '1px black' }}>talk</span> for</h2>
            <h2>Something special</h2>
          </div>

          <p className='text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-6'>I seek to push the limits of creativity to create high-engaging, user-friendly, and memorable interactive experiences.</p>

          <div className='font-semibold text-sm lg:text-xl flex flex-col mt-6 gap-2 lg:gap-4'>
            <motion.a
              whileHover={{ x: 5 }}
              className='flex items-center gap-2 group'
              href="mailto:prajapatikeshav497@gmail.com"
            >
              <span className='border-2 transition-all border-transparent group-hover:border-black rounded-full p-1'>
                <IoMdMail className="w-4 h-4 lg:w-5 lg:h-5" />
              </span>
              prajapatikeshav497@gmail.com
            </motion.a>

            <motion.a
              whileHover={{ x: 5 }}
              className='flex items-center gap-2 group'
              href="tel:9136669616"
            >
              <span className='border-2 transition-all border-transparent group-hover:border-black rounded-full p-[5px]'>
                <FaPhone className="w-3 h-3 lg:w-4 lg:h-4" />
              </span>
              9136669616
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
