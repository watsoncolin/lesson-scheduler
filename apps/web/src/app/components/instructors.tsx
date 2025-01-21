const people = [
  {
    name: 'Ryan',
    role: 'Instructor',
    bio: 'Ryan is a free spirit who goes where the waves take him. A water-lover from birth, he served in the U.S. Navy and continues to travel the world for months at a time (chasing after whale sharks and the like). Ryan has taught swim lessons for 18 years in multiple locations and is enthusiastic about taking his lucky students on under-water adventures. Look for him @ 103 Lakeview T-TH',
    imageUrl: 'https://www.stansburyswim.com/uploads/instructor-4..jpeg',
  },
  {
    name: 'Laila',
    role: 'Instructor',
    bio: 'Hello!! My name is Laila Green! I’m currently a senior at Stansbury High School. I’m on Stansbury’s Ballroom Team, Dance Company, as well as Hope Squad! I am CPR certified and spend all of my summers wake surfing and wakeboarding with my family. I have two younger siblings and I tutor kids during the school year. This is my 3rd year teaching lessons and I can’t wait to get to work with your kids!! You can find me @ Lanyard.',
    imageUrl: 'https://www.stansburyswim.com/uploads/instructor-26..jpeg',
  },
  {
    name: 'Brylee',
    role: 'Instructor',
    bio: `Hi I'm Brylee! I'm a senior at Grantsville High. I often help "behind-the-scenes" in many school and community events. I'm also heavily involved in our GHS student government. I regularly babysit my little cousins and love every minute with them! During the summer I love spending time at the pool, camping with family, and helping plan our upcoming school events. I loved watching my students progress last couple of summers so I'm super excited to be teaching swim lessons again! I can't wait to work with you and your child! You can find me @ Durfee`,
    imageUrl: 'https://www.stansburyswim.com/uploads/instructor-27..jpeg',
  },
  {
    name: 'Kate',
    role: 'Instructor',
    bio: `Hi! My name is Kate Gibbons. I just graduated from Stansbury High. I was a part of the tennis, basketball, golf teams, and also student government! Ever since I can remember I have loved being in the water! I love to snorkel and I'm always down to go swimming! I have loved working with kids at various kids sports camps and clinics for the sports I play. I have also been part of the preschool education program at SHS and am CPR certified. I look forward to working with your kids again!`,
    imageUrl: 'https://www.stansburyswim.com/uploads/instructor-37..jpeg',
  },
]

export default function Instructors() {
  return (
    <div id="team" className="bg-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our team</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We're a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
            best results for our students.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2"
        >
          {people.map(person => (
            <li key={person.name}>
              <img className="aspect-[3/2] w-full rounded-2xl object-cover" src={person.imageUrl} alt="" />
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">{person.name}</h3>
              <p className="text-base leading-7 text-gray-600">{person.role}</p>
              <p className="mt-4 text-base leading-7 text-gray-600">{person.bio}</p>
              {/* <ul role="list" className="mt-6 flex gap-x-6">
                <li>
                  <a href={person.xUrl} className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">X</span>
                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
