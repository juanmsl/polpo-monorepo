'use client';
import { Button, ColorTypes, VariantTypes } from 'polpo/components';

const colors = Object.values(ColorTypes);
const variants = Object.values(VariantTypes);

export default function UIPage() {
  return (
    <section>
      <section className='p-6 grid grid-cols-[repeat(4,200px)] gap-4'>
        {colors.map(color => [
          ...variants.map(variant => (
            <Button key={`${variant}-${color}`} color={color} variant={variant}>
              {variant}
            </Button>
          )),
        ])}
        {variants.map(variant => (
          <Button key={`${variant}-disabled`} disabled variant={variant}>
            disabled
          </Button>
        ))}
      </section>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum debitis quia quidem reprehenderit tenetur? Ad,
        consequatur consequuntur ducimus eius explicabo fugiat impedit mollitia, nam nobis provident saepe totam vel. At
        consequatur, deleniti exercitationem explicabo nam officiis perferendis ratione repellat? Blanditiis enim minima
        quam quas recusandae rem repellat, repudiandae. Amet autem beatae consequatur culpa doloribus dolorum enim
        explicabo, id impedit iste libero nam nesciunt numquam odio possimus quas quo quos sint ut veniam? Delectus
        eveniet nam nemo quasi sed voluptatibus? Aut deleniti, fuga ipsum officia quasi voluptatem! Ab alias asperiores
        dicta dignissimos ea enim eum illum laboriosam magni mollitia nemo, non nostrum odit pariatur possimus rem sed
        sit tempora ullam unde vel veritatis vitae! A aliquid dolor dolore, doloribus error et eum in, itaque nemo,
        nesciunt obcaecati provident quis quo? Ab ad asperiores aut commodi error, expedita harum incidunt ipsa ipsam
        itaque iusto laboriosam laudantium magni nisi non odio perferendis possimus quas quis quo rem sed sequi
        similique sunt veritatis? Iste neque pariatur voluptatum. Aspernatur dolorum neque non? Aliquam distinctio
        magnam praesentium sunt voluptates! Accusamus aperiam consequatur ex libero nisi officia omnis possimus qui quos
        sed? Aliquam aperiam autem beatae consectetur dignissimos dolore esse eveniet explicabo facilis harum illum
        itaque laudantium magni minima minus porro quae quia ratione repellendus, saepe soluta ullam veritatis. Adipisci
        cumque delectus doloribus enim eveniet illo nostrum, omnis quisquam saepe sequi? Animi explicabo facilis itaque
        maiores, qui ratione repudiandae suscipit unde veniam voluptates! Beatae dolores excepturi saepe? Alias aliquam
        aperiam aspernatur blanditiis commodi corporis cumque dolor dolores eaque exercitationem ipsa ipsum, iste,
        maiores numquam perspiciatis quaerat quidem quisquam reiciendis similique soluta suscipit tempora temporibus
        totam veniam vitae? Ad alias aliquid aspernatur enim repellendus tempora. Accusantium aliquid, architecto beatae
        cupiditate deserunt enim facilis illo laboriosam molestiae quae sunt tempore vel! Beatae enim illo ipsam non
        obcaecati praesentium provident temporibus. Aliquam assumenda dicta expedita facilis sint. Deserunt dolor earum
        laboriosam, laborum modi omnis placeat praesentium quisquam tenetur unde! Ad, adipisci aperiam consequuntur
        delectus distinctio dolore explicabo ipsa ipsam ipsum, magni, nam nesciunt porro quas recusandae sapiente sequi
        similique tempore totam velit voluptatum? Deleniti doloribus modi odio pariatur quae ratione ullam! Alias
        corporis dicta, eveniet expedita maxime minus nam optio, quas quod recusandae temporibus, vitae voluptas.
        Aperiam asperiores consectetur, consequuntur corporis delectus eaque et explicabo harum modi, numquam quis quod
        quos ratione recusandae sapiente. Alias aliquam ea eligendi error eum laboriosam maxime quod ullam veniam! Fuga
        nesciunt sed similique voluptatibus? Aperiam architecto beatae doloremque eius in magnam minus nihil obcaecati
        officia provident, similique ullam unde voluptatibus! Accusamus amet animi at cumque ex, expedita, inventore
        iusto nam nisi non nostrum praesentium quasi reiciendis repellendus, sunt tempora unde ut vero. Accusamus
        aliquam animi beatae blanditiis consectetur cupiditate, deleniti dolor eligendi esse eum eveniet expedita fugiat
        impedit magnam maxime minima necessitatibus neque nisi, omnis quae quas quia reiciendis repellendus sint sit
        tempore velit voluptatem. Amet autem doloribus dolorum eveniet harum, hic in, nobis quo quod sapiente sequi
        sint, soluta. Accusamus at blanditiis, cumque deleniti ducimus ea esse, molestiae mollitia necessitatibus nemo,
        odit pariatur praesentium quidem saepe ullam voluptas voluptates. Autem doloremque dolores dolorum ducimus ea ex
        facere harum iure, laborum minima modi optio quisquam reiciendis repellat sequi sit totam unde voluptatibus.
        Consectetur ipsum labore laudantium nisi quo sequi voluptatum. Adipisci animi delectus dolores et minima
        molestiae nesciunt nobis quam quidem saepe! Alias commodi debitis ea iste natus quas qui voluptatem. Alias
        aliquid amet deleniti dolores nisi quo veritatis! Animi cumque cupiditate dignissimos esse hic iste maiores,
        modi praesentium quo reiciendis, sapiente, voluptate. Ad alias at beatae consequatur culpa delectus deleniti
        dolore esse exercitationem explicabo inventore, ipsa iste modi mollitia necessitatibus nihil nisi, nostrum,
        numquam quo saepe similique soluta totam. Autem doloremque necessitatibus nesciunt saepe suscipit? Ad nemo,
        possimus! Accusantium ad at doloribus est id iure nobis, veritatis? A assumenda culpa, earum eum, explicabo
        minus nam natus omnis quaerat quibusdam similique veritatis. Cumque doloribus ea excepturi iste placeat qui.
        Adipisci aliquam aliquid consequatur deserunt dolor dolores eligendi esse eveniet facilis id illo iure iusto
        labore, laborum libero modi molestiae neque nihil non obcaecati quae quia quibusdam quidem quis rem rerum saepe
        sapiente similique sint sunt, suscipit, tempore ut voluptate. Ab aliquid aspernatur at atque consectetur culpa
        cum deleniti dolore esse explicabo, fugiat fugit harum ipsum iusto libero magnam mollitia obcaecati perspiciatis
        provident quae quam, quo rerum sapiente tempora veritatis? Accusantium aperiam consequuntur eaque iure magnam
        nulla quis tenetur? Aliquid autem culpa dolore excepturi facere nemo perspiciatis sunt, vero. Delectus
        distinctio earum fugiat iusto libero magnam molestiae, unde? Animi aperiam assumenda consectetur cum debitis
        delectus dignissimos distinctio dolore dolores ea eius facilis fugiat hic illum inventore iusto magnam magni
        molestiae nesciunt nisi nulla pariatur perferendis placeat possimus provident quam, quasi quis quo ratione
        reiciendis rem repellendus sapiente suscipit tenetur vitae voluptate voluptatem? Ab accusamus, aliquam, aperiam
        aut beatae consectetur deserunt eaque enim expedita harum inventore itaque libero magnam maxime, minus nobis
        odio quaerat quas quis repellat sequi sit ut veritatis! Ab asperiores consectetur culpa cumque dicta dignissimos
        dolorem doloremque eaque exercitationem expedita explicabo illo in molestiae, nemo nihil officia optio pariatur
        possimus qui voluptatibus? Dicta dignissimos eum ex id impedit iste nihil tempore. Amet asperiores, fugiat
        molestias nisi odio quaerat ratione tenetur. Animi aspernatur corporis dicta eaque nisi nostrum nulla
        perferendis quos repellat saepe. Assumenda consequatur corporis ex ipsum mollitia qui repellat saepe suscipit
        veniam veritatis? Accusamus aut consectetur corporis deserunt ducimus et ex expedita fugiat fugit impedit,
        inventore itaque iure laudantium provident quis quos ratione rerum similique temporibus voluptatum? Asperiores
        aspernatur dignissimos eveniet fugiat iste nulla officiis placeat rerum sapiente ullam. Aliquam aliquid
        architecto assumenda atque culpa dolorem ducimus et exercitationem, expedita facere laboriosam maiores minima
        necessitatibus neque officia, optio placeat possimus quae quam saepe sapiente similique, sint soluta. Assumenda,
        cumque dolor dolorum facere ipsum reprehenderit velit vero! Aperiam dignissimos dolore ea, eos error
        exercitationem hic illo in ipsa iusto nulla, possimus quisquam saepe tempora ullam unde voluptate. Consequuntur
        dolores eos maxime nesciunt quis rerum temporibus, velit? At culpa facere molestias omnis voluptatum. Cupiditate
        debitis, eius fuga ipsa maiores quia unde! Illum molestiae, nisi? A alias consequuntur cupiditate delectus,
        deleniti dignissimos dolore ducimus ea eaque eligendi esse facere facilis ipsa maxime, modi mollitia
        necessitatibus nisi non nostrum odio odit optio quaerat sit sunt velit voluptates voluptatum. Alias aliquid
        atque distinctio eaque error expedita facilis fuga fugiat hic, laudantium molestias nisi obcaecati officiis
        pariatur, qui, quidem ratione repellendus saepe sit voluptas. Dolores, et explicabo impedit neque quaerat soluta
        unde vero? Alias amet aperiam aut blanditiis culpa cumque deserunt doloremque enim eum explicabo minima odit
        officia omnis praesentium ratione rem repellendus, saepe sed sequi tenetur totam unde velit voluptas. Accusamus
        ad adipisci alias consequatur deleniti dicta dignissimos esse expedita explicabo fugiat fugit hic inventore
        molestiae molestias, necessitatibus nobis numquam odit officiis omnis perspiciatis placeat provident quas quasi
        quidem, quis sequi similique voluptas? Assumenda blanditiis earum eligendi et expedita nulla quidem reiciendis
        sint totam veniam. Ad architecto deserunt enim exercitationem incidunt iure libero nemo nulla quasi temporibus.
        Aperiam, quo, veritatis? Adipisci amet corporis culpa cum deleniti dolores error esse eum expedita illum ipsa
        iste laborum libero, nam nulla odit officiis omnis quas reiciendis rem repellendus sunt veniam vero? Ad ipsum
        nostrum repellat sint voluptatibus. Deleniti dolorum, harum incidunt ipsa odio optio rem voluptas. Atque cumque
        dignissimos ea exercitationem natus praesentium quae quod rerum sit temporibus. Corporis, id totam! Deserunt
        dolore in inventore iusto, magnam nisi nobis quas! Amet explicabo iste iure numquam, porro possimus quae quam
        sint tenetur vel! Eligendi esse, hic modi molestias quos velit voluptas. Illum in quod soluta. Aspernatur,
        cupiditate doloremque eligendi et nisi quaerat repellat ullam ut! Accusantium alias architecto commodi,
        consequatur cum delectus, dignissimos earum eius esse hic maiores nam neque porro quas quasi qui quo sapiente
        totam ut, velit? Adipisci atque culpa illum ipsam molestiae nihil perspiciatis qui rerum tenetur voluptatum.
        Culpa eius est modi mollitia optio saepe voluptas. Aperiam aut beatae culpa deleniti doloremque hic vero? Aut
        culpa doloremque doloribus excepturi laborum magni maxime, nihil nisi odio omnis pariatur perferendis quis
        ratione recusandae voluptates. Ad cumque earum ipsa ipsum laudantium necessitatibus nihil reiciendis! Asperiores
        doloribus, et maxime minima optio quisquam tempora totam. Ad animi, asperiores assumenda commodi corporis
        deleniti deserunt dolore, eius eos fugiat illo nesciunt perferendis praesentium quia sequi sint, soluta suscipit
        totam ullam voluptas. Ab animi consequatur, eos error hic id ipsum, iusto natus optio placeat recusandae tempora
        totam ullam ut vel velit veritatis vero voluptates. Adipisci aliquam aperiam blanditiis dolorum enim error esse
        eveniet, facilis in natus numquam odio provident, quasi quidem saepe sed sequi unde voluptates. Consequatur
        doloremque esse excepturi fuga hic maxime placeat suscipit, vitae. Aperiam at blanditiis cum debitis, deserunt
        dolorum ex facere hic ipsa labore laboriosam laudantium magni modi necessitatibus nihil nobis obcaecati odit
        officia provident quaerat qui rem reprehenderit, repudiandae rerum saepe sequi soluta tenetur veniam vero
        voluptas? At consectetur cumque ea error, eum excepturi iure laborum maiores maxime molestiae numquam omnis rem
        voluptatum! Alias aperiam dolor facilis impedit incidunt nihil porro quasi ratione. Alias asperiores ipsa quis
        reprehenderit ut! At dolore doloremque esse nesciunt optio quaerat quos rem repellat, voluptate voluptates.
        Aliquid, amet atque consectetur cum debitis dignissimos esse fugit, illum laborum libero maiores mollitia neque
        nulla odio quam similique tempora temporibus unde voluptatem voluptatum. Delectus dolores earum harum itaque
        libero modi, molestiae nobis obcaecati officiis reprehenderit suscipit voluptas. Debitis hic libero magni
        quibusdam quis? Cupiditate dolores id porro! Amet aperiam, architecto assumenda autem blanditiis cumque dicta,
        distinctio doloremque eligendi error est ex fugiat hic id impedit laborum modi nobis non nostrum odit officia
        omnis optio pariatur praesentium quae quam quis reiciendis repellat sed veritatis. Amet animi assumenda
        blanditiis, consectetur corporis dolorem exercitationem illum labore libero maiores, odit possimus similique
        totam. Ab aspernatur autem beatae consequuntur corporis deserunt distinctio, dolorem dolorum ea eius esse est
        exercitationem explicabo ipsum laborum laudantium magnam, molestias nulla officiis provident qui quibusdam sit
        sunt tenetur totam ullam voluptatem voluptatum. At laboriosam laborum officiis omnis vero voluptatem. Aliquid
        aspernatur consectetur dolorum? A asperiores deserunt illo itaque laboriosam neque nobis nulla officiis
        praesentium, reprehenderit tenetur vitae? Illo minima non quam quibusdam ratione. Cum molestias necessitatibus
        nisi optio ratione? Accusamus amet architecto asperiores assumenda at consequatur cum delectus dicta distinctio
        earum excepturi facere hic id illo illum in ipsum iste itaque iure magni minus necessitatibus nesciunt non nulla
        possimus, provident quas quasi quidem rerum saepe sint sit vero voluptatibus? Aliquam amet animi cum dolores
        enim eveniet hic mollitia optio porro quis quisquam, ratione, reprehenderit, saepe sed sequi suscipit tempore.
        Ex ipsa ipsum laboriosam nesciunt perferendis possimus quia reiciendis! Ipsam necessitatibus numquam placeat
        quos. A accusantium ad architecto at atque deserunt distinctio eius facilis harum in, inventore ipsam ipsum
        itaque laborum maxime nisi nulla officiis omnis provident quam qui quis ratione rem saepe sed similique tempora
        totam vero vitae voluptatem. Architecto delectus fugiat libero porro quae, quo tempora voluptatum. Aliquam
        aspernatur atque nam recusandae tempora. Ab commodi dolor dolores dolorum ea esse eveniet fuga illum in libero
        maxime minima, necessitatibus nemo neque nobis perspiciatis placeat quasi reiciendis saepe sit. Architecto aut
        dicta dolore excepturi fugit minus molestiae quisquam recusandae rerum voluptas. A alias aliquam dicta, dolorem
        ducimus maiores minima, minus, molestiae neque nihil nobis possimus qui sequi temporibus velit. Cumque, dolor,
        sunt. Asperiores beatae dolorem est inventore itaque labore laudantium numquam qui suscipit? Accusamus corporis
        culpa dolores ducimus eius esse expedita fugit id inventore, laudantium magni minus omnis perspiciatis possimus
        quisquam? In, laudantium, repudiandae? Accusantium blanditiis consequatur facilis fuga in, modi, molestias odit
        placeat provident quaerat, recusandae repudiandae saepe sapiente tempore vel. Adipisci asperiores consectetur
        dicta doloremque, ducimus eaque ex expedita libero nobis possimus quaerat repellendus sapiente totam ut vitae?
        Aliquid cum debitis dolore fugiat ipsa iusto magnam repudiandae. Animi dicta dignissimos distinctio dolores
        eligendi esse fuga illo inventore ipsam itaque molestiae, nam non officia, recusandae repudiandae sed totam
        unde. Alias aliquid aut beatae delectus deleniti dolorem ea earum est facilis id ipsam magni nam nemo non quae
        quam quisquam repellendus, sapiente sint ullam vel veniam voluptatem? A, blanditiis debitis dignissimos eveniet
        iste laborum molestias, nisi optio pariatur perferendis, perspiciatis repellat veritatis voluptate! Adipisci
        consequatur facere necessitatibus, praesentium sit ullam!
      </p>
    </section>
  );
}
